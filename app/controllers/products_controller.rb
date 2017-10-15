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

  def create
    return if Rails.env.production? && params[:key] != ENV['PRODUCTS_KEY']
    Product.create(params.permit(
      :name,
      :description,
      :category,
      :featured,
      :in_stock,
      unit_products_attributes: [:property, :price],
      product_images_attributes: [:image]
    ))
  end
end
