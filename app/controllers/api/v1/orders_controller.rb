module Api
  module V1
    class OrdersController < ApplicationController
      before_action :authenticate_api_v1_user!
      before_action :authorize_user, only: [:show, :update, :destroy]

      # GET /api/v1/orders
      def index
        if current_api_v1_user.admin?
          orders = Order.all
        else
          orders = current_api_v1_user.orders
        end
        render json: orders
      end

      # POST /api/v1/orders
      def create
        order = current_api_v1_user.orders.build(order_params)
        if order.save
          render json: { message: 'Order created successfully', order: order }, status: :created
        else
          render json: { errors: order.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # GET /api/v1/orders/:id
      def show
        order = Order.includes(order_descriptions: :item).find(params[:id])
        render json: order.as_json(include: { 
          order_descriptions: { include: { item: { only: :name } } }
        })
      end
      

      # PATCH/PUT /api/v1/orders/:id
      def update
        if @order.update(order_params)
          render json: { message: 'Order updated successfully', order: @order }
        else
          render json: { errors: @order.errors.full_messages }, status: :unprocessable_entity
        end
      end

      # DELETE /api/v1/orders/:id
      def destroy
        @order.destroy
        render json: { message: 'Order deleted successfully' }, status: :ok
      end

      private

      def order_params
        params.require(:order).permit(:amount, order_descriptions_attributes: [:item_id, :quantity])
      end

      def authorize_user
        @order = Order.find(params[:id])
        unless current_api_v1_user.admin? || @order.user_id == current_api_v1_user.id
          render json: { error: 'Access denied' }, status: :forbidden
        end
      end
    end
  end
end
