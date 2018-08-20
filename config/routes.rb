Rails.application.routes.draw do
  get 'carts/index'

  get 'password_resets/new'

  get 'password_resets/edit'

  root to: 'public_pages#index'
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  get 'users/check_email', to: 'users#check_email'

  root to: 'public_pages#index'
  resources :public_pages
  resources :users
  resources :sessions
  resources :carts, only: %i[index destroy]
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
    get 'product/import', to: 'products#import'
    post 'product/import_file', to: 'products#import_file'
    get 'product/export_file', to: 'products#export_file'
    delete 'delete_image/:id/:index/:size', to: 'products#destroy_image'
    get 'product/count_images/:id', to: 'products#count_image'
    delete 'timer/destroy_cache', to: 'timers#destroy_cache'
  end
  get '/auth/google_oauth2', as: 'google'
  get 'auth/:provider/callback', to: 'sessions#login_google'
  get 'auth/failure', to: redirect('/')
  resources :account_activations, only: [:edit]
  resources :password_resets, only: %i[new create edit update]
  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'
end
