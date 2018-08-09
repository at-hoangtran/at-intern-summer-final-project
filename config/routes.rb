Rails.application.routes.draw do
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  root to: 'public_pages#index'
  resources :users
  resources :sessions
  namespace :admin do
    root to: 'homes#index'
    resources :users
    resources :categories
    resources :products
    resources :orders

    delete "delete_image/:id/:index/:size", to: "products#destroy_image"
    get "product/count_images/:id", to: "products#count_image"
  end
end
