class ProductsController < ApplicationController
  def show
    render json: Product.order(:position).find_by(params.permit(:id, :name))
  end

  def search
    render json: Product.order(:position).where(params.permit(:category, :featured))
  end

  def index
    render json: Product.order(:position)
  end
end
