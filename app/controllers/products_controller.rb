class ProductsController < ApplicationController
  def show
    render json: Product.find_by(params.permit(:id, :name))
  end

  def search
    render json: Product.where(params.permit(:category, :featured))
  end

  def index
    render json: Product.all
  end
end
