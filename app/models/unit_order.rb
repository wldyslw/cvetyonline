class UnitOrder < ApplicationRecord
  belongs_to :unit_product
  belongs_to :order
end
