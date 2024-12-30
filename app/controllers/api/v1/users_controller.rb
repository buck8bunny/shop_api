module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_api_v1_user!, except: [:create]

      # GET /api/v1/users
      def index
        if current_api_v1_user.admin?
          users = User.all
        else
          users = [current_api_v1_user]
        end
        render json: users
      end

      # POST /api/v1/users
      def create
        user = User.new(user_params)
        if user.save
          render json: { message: 'User created successfully', user: user }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # PATCH/PUT /api/v1/users/:id
      def update
        user = User.find(params[:id])
        if user.update(user_params)
          render json: { message: 'User updated successfully', user: user }
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/users/:id
      def destroy
        user = User.find(params[:id])
        user.destroy
        render json: { message: 'User deleted successfully' }, status: :ok
      end

      def show
        user = User.find(params[:id])
      
        # Разрешить доступ только админу или самому пользователю
        if current_api_v1_user.admin? || current_api_v1_user == user
          render json: user
        else
          render json: { error: 'Access denied' }, status: :forbidden
        end
      end
      

      private

      def user_params
        params.require(:user).permit(:email, :password, :first_name, :last_name, :role)
      end
    end
  end
end
