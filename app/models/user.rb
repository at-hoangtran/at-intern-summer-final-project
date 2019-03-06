class User < ApplicationRecord
  attr_accessor :remember_token, :activation_token

  before_save { email.downcase! }
  before_create :create_activation_digest

  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  PHONE_REGEX = /\A(?:\+?\d{1,3}\s*-?)?\(?(?:\d{3})?\)?[- ]?\d{3}[- ]?\d{4}\z/
  validates :email, presence: true,
                    length: { maximum: Settings.max_email_length },
                    format: { with: VALID_EMAIL_REGEX },
                    uniqueness: true
  # validates :name,  presence: true, length: { maximum: 50 }
  # validates :phone, uniqueness: true, length: { maximum: 15 },
  #                   format: { with: PHONE_REGEX }, numericality: true

  has_secure_password

  validates :password,
            presence: true, allow_nil: true,
            length: { minimum: Settings.min_password_length }
  validates :password_confirmation,
            presence: true, allow_nil: true,
            length: { minimum: Settings.min_password_length }

  # Returns the hash digest of the given string.
  class << self
    def digest(string)
      if cost = ActiveModel::SecurePassword.min_cost
        BCrypt::Engine::MIN_COST
      else
        BCrypt::Engine.cost
      end
      BCrypt::Password.create(string, cost: cost)
    end

    # Returns a random token.
    def new_token
      SecureRandom.urlsafe_base64
    end
  end

  def remember
    self.remember_token = User.new_token
    update_attribute(:remember_digest, User.digest(remember_token))
  end

  # Returns true if the given token matches the digest.
  def authenticated?(attribute, token)
    digest = send("#{attribute}_digest")
    return false if digest.nil?
    BCrypt::Password.new(digest).is_password?(token)
  end

  # Forgets a user.
  def forget
    update_attribute(:remember_digest, nil)
  end

  def activate
    update_attribute(:activated, true)
    update_attribute(:activated_at, Time.zone.now)
  end

  def send_activation_email
    UserMailer.account_activation(self).deliver_now
  end

  def self.find_or_create_from_auth_hash(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.first_name + ' ' + auth.info.last_name
      user.email = auth.info.email
      user.password = SecureRandom.urlsafe_base64
      user.save!
    end
  end

  private

    def create_activation_digest
      self.activation_token  = User.new_token
      self.activation_digest = User.digest(activation_token)
    end
end
