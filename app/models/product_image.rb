class ProductImage < ApplicationRecord
  belongs_to :product

  has_attached_file :image, use_timestamp: false, styles: { high: '1200x900#', medium: '600x450#', thumb: '64x64#' }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/
end
