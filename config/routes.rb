Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
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
