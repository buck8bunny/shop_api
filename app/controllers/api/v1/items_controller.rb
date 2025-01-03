module Api
  module V1
    class ItemsController < ApplicationController
      before_action :authenticate_api_v1_user!
      before_action :authorize_admin!, only: [:create, :update, :destroy]

      def index
        items = Item.all
        render json: items
      end

      def create
        @item = Item.new(item_params)
        if @item.save
          render json: @item, status: :created
        else
          render json: { error: @item.errors.full_messages }, status: :unprocessable_entity
        end
      end
      

      def update
        item = Item.find(params[:id])
        if item.update(item_params)
          render json: { message: 'Item updated successfully', item: item }
        else
          render json: { errors: item.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        item = Item.find(params[:id])
        item.destroy
        render json: { message: 'Item deleted successfully' }, status: :ok
      end

      private

      def item_params
        params.require(:item).permit(:name, :description, :price)
      end

      def authorize_admin!
        unless current_api_v1_user&.admin?
          render json: { error: 'Access denied' }, status: :forbidden
        end
      end
    end
  end
end
