class OrdersController < ApplicationController
  def create
    Order.create(params[:order].permit(
      :telephone,
      :pickup,
      :comment,
      (:address unless params[:order][:pickup]),
      unit_orders_attributes: [:product_id, :quantity])
    )
  end
end
