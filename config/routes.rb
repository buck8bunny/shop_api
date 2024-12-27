Rails.application.routes.draw do
  post '/api/v1/login', to: 'application#login'

  namespace :api do
    namespace :v1 do
      devise_for :users, path: '', path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'sign_up'
    }

      resources :users, only: [:index, :show, :update, :destroy, :create]
      resources :items
      resources :orders, only: [:index, :create, :show]
    end
  end
end
