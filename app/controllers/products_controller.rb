class ProductsController < ApplicationController
  def show
    render json: params.key?('id') ? Product.find_by(id: params[:id]) : Product.find_by(name: params[:name]);
  end

  def search
    render json: Product.where(category: params[:category])
  end

  def index
    render json: Product.all
  end
end
