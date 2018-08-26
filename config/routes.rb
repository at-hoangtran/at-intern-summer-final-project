Rails.application.routes.draw do
  mount Ckeditor::Engine => '/ckeditor'
  get 'password_resets/new'

  get 'password_resets/edit'

  root to: 'public_pages#index'
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  get 'users/check_email', to: 'users#check_email'
  get 'current_user', to: 'users#current_user_id'
  get 'product_muti', to: 'public_pages#product_order_multiple'
  get 'search_index/:search', to: 'public_pages#search_index'

  get 'auction_current', to: 'auctions#auction_current'
  get 'auction_win', to: 'auctions#auction_win'
  get 'auction_loser', to: 'auctions#auction_loser'

  get 'request_history_order/:status',
      to: 'history_orders#request_order'

  get 'history_orders/:id/export_file', to: 'history_orders#export_file'

  root to: 'public_pages#index'
  resources :public_pages
  resources :users
  resources :sessions
  resources :orders
  resources :categories, only: %(show)
  resources :auctions, only: %(index)
  resources :history_orders, only: %(index)
  resources :chat_rooms
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
    get 'chart_order', to: 'homes#chart_order'
    get 'request_order', to: 'homes#request_order'
    get 'request_auction', to: 'homes#request_auction'
    get 'request_member', to: 'homes#request_member'
    get 'request_online', to: 'homes#request_online'
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

  match '/404', to: 'error/errors#not_found', via: :all
  match '/500', to: 'error/errors#internal_server_error', via: :all

  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'
end
