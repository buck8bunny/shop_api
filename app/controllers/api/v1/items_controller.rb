module Api
  module V1
    class ItemsController < ApplicationController
      before_action :authenticate_user!
      before_action :set_item, only: [:show, :update, :destroy]
      before_action :admin_only, only: [:create, :update, :destroy]

      def index
        @items = Item.all
        render json: @items
      end

      def create
        @item = Item.new(item_params)
        if @item.save
          render json: @item, status: :created
        else
          render json: @item.errors, status: :unprocessable_entity
        end
      end

      def show
        render json: @item
      end

      def update
        if @item.update(item_params)
          render json: @item
        else
          render json: @item.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @item.destroy
        head :no_content
      end

      private

      def set_item
        @item = Item.find(params[:id])
      end

      def item_params
        params.require(:item).permit(:name, :description, :price)
      end

      def admin_only
        render json: { error: 'Forbidden' }, status: :forbidden unless current_user.admin?
      end
    end
  end
end