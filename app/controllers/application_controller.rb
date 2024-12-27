
class ApplicationController < ActionController::API
    # include CanCan::ControllerAdditions
    def login
        user = User.find_for_authentication(email: params[:user][:email])
        
        if user&.valid_password?(params[:user][:password])
          render json: { message: 'Logged in successfully', user: user }, status: :ok
        else
          render json: { error: 'Invalid email or password' }, status: :unauthorized
        end
      rescue => e
        render json: { error: e.message }, status: :unprocessable_entity
      end
  end
  