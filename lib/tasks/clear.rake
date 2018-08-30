namespace :clear do
  desc 'TODO'
  task clear_auction: :environment do
    auction = Auction.all
    auction.each do |e|
      if (DateTime.now - e.created_at.to_datetime) > 30
        product = Product.find_by(e.product_id)
        product.update_attribute(:quantity, product.quantity + 1)
      end
    end
  end
end
