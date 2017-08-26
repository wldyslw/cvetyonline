class OrdersController < ApplicationController
  def create
    Order.create(params[:order].permit(
      :client_name,
      :telephone,
      :pickup,
      :comment,
      (:address unless params[:order][:pickup]),
      unit_orders_attributes: [:product_id, :quantity])
    )
  end
end
