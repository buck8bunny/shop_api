module Api
  module V1
    class OrderDescriptionsController < ApplicationController
      before_action :authenticate_api_v1_user!

      def create
        order_description = OrderDescription.new(order_description_params)

        if order_description.save
          render json: { message: 'Order description created successfully', order_description: order_description }, status: :created
        else
          render json: { errors: order_description.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def order_description_params
        params.require(:order_description).permit(:order_id, :item_id, :quantity)
      end
    end
  end
end
