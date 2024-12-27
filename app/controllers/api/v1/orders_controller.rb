module Api
  module V1
    class OrdersController < ApplicationController
      before_action :authenticate_user!

      def index
        @orders = current_user.orders
        render json: @orders, include: :order_descriptions
      end

      def create
        ActiveRecord::Base.transaction do
          @order = current_user.orders.create!(amount: calculate_total)

          params[:items].each do |item|
            @order.order_descriptions.create!(item_id: item[:id], quantity: item[:quantity])
          end
        end

        render json: @order, status: :created
      rescue ActiveRecord::RecordInvalid => e
        render json: { error: e.message }, status: :unprocessable_entity
      end

      def show
        @order = current_user.orders.find(params[:id])
        render json: @order, include: :order_descriptions
      end

      private

      def calculate_total
        params[:items].sum do |item|
          item_data = Item.find(item[:id])
          item_data.price * item[:quantity]
        end
      end
    end
  end
end