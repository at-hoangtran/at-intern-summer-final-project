class User < ApplicationRecord
  acts_as_paranoid
  has_secure_password

  attr_accessor :activation_token
  before_save :downcase_email

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  PHONE_REGEX = /\A(?:\+?\d{1,3}\s*-?)?\(?(?:\d{3})?\)?[- ]?\d{3}[- ]?\d{4}\z/

  validates :email, presence: true, length: { maximum: 255 },
                     format: { with: VALID_EMAIL_REGEX },
                     uniqueness: true
  validates :name,  presence: true, length: { maximum: 50 }
  validates :phone, uniqueness: true, length: { maximum: 15 },
                     format: { with: PHONE_REGEX }, numericality: true

  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true

  mount_uploader :avatar, AvatarUploader
  attr_accessor :crop_x, :crop_y, :crop_w, :crop_h
  after_update :crop_avatar

  def crop_avatar
    avatar.recreate_versions! if crop_x.present?
  end

  default_scope ->{order(created_at: :desc)}
  scope :search_name, -> search {where "name like ?", "%#{search}%"}
  enum role: [ :member, :admin ]

 # Returns the hash digest of the given string.
  def User.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST :
                                                 BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  private

    def downcase_email
      self.email = email.downcase
    end
end
