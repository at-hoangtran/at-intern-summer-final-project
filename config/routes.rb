Rails.application.routes.draw do
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  get 'users/check_email', to: 'users#check_email'

  root to: 'public_pages#index'
  resources :users
  resources :sessions
  namespace :admin do
    root to: 'homes#index'
    resources :users
    resources :categories
    resources :products
    resources :orders do
      member do
        patch :approve
        patch :reject
      end
    end
    resources :timers
    resources :auctions
    resources :auction_details, only: %i[destroy]
    get 'product/export_file', to: 'products#export_file'
    delete 'delete_image/:id/:index/:size', to: 'products#destroy_image'
    get 'product/count_images/:id', to: 'products#count_image'
  end
end
