Rails.application.routes.draw do
  get 'password_resets/new'

  get 'password_resets/edit'

  root to: 'public_pages#index'
  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
  resources :users
  resources :sessions
  namespace :admin do
    root to: 'homes#index'
    resources :users
    resources :categories
    resources :products
    resources :orders
  end
  get '/auth/google_oauth2', as: 'google'
  get 'auth/:provider/callback', to: 'sessions#login_google'
  get 'auth/failure', to: redirect('/')
  resources :account_activations, only: [:edit]
  resources :password_resets, only: %i[new create edit update]
end
