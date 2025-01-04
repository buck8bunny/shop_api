Rails.application.routes.draw do
  get "home/index"
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
    # Для обслуживания статики (собранного React-приложения)
    root 'home#index'  
end
