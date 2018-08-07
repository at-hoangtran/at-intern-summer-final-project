Rails.application.routes.draw do
  root to: "public_pages#index"
  resources :users
  resources :sessions
  namespace :admin do
    root to: "homes#index"
    resources :users
    resources :categories
    resources :products
    resources :orders
  end
end
