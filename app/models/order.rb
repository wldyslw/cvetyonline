class Order < ApplicationRecord
  has_many :unit_orders
  has_many :products, through: :unit_orders
  accepts_nested_attributes_for :unit_orders
end
