Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        sessions: 'sessions'
      }

      resources :users, only: [:index, :show, :update, :destroy, :create]
      resources :items
      resources :orders, only: [:index, :create, :show]
    end
  end
end
