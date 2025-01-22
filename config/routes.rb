Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        sessions: 'sessions'
      }

      resources :users, only: [:index, :show, :update, :destroy, :create]
      resources :items, only: [:index, :show, :create, :update, :destroy]
      resources :orders, only: [:index, :create, :show]
      resources :order_descriptions, only: [:create]
      
    end
  end
  get '*path', to: 'react_app#index', constraints: ->(req) { !req.xhr? && req.format.html? }

end
