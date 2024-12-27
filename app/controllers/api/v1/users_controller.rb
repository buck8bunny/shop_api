module Api
  module V1
    class UsersController < ApplicationController
      # Используйте CanCanCan для управления авторизацией
   
      load_and_authorize_resource except: :create

      # GET /api/v1/users
      def index
        @users = User.all
        render json: @users
      end

      # GET /api/v1/users/:id
      def show
        render json: @user
      end

      # POST /api/v1/users
      def create
        Rails.logger.info "Received params: #{params.inspect}"
        @user = User.new(user_params)
        if @user.save
          render json: { message: 'User created successfully' }, status: :created
        else
          Rails.logger.error "User creation failed: #{@user.errors.full_messages}"
          render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
      end
      
      
      # PATCH/PUT /api/v1/users/:id
      def update
        if @user.update(user_params)
          render json: @user
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/users/:id
      def destroy
        @user.destroy
        head :no_content
      end

      private

      # Разрешенные параметры для пользователя
      def user_params
        params.require(:user).permit(:email, :password, :first_name, :last_name)
      end
    end
  end
end
