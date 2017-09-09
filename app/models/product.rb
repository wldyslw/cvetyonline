class Product < ApplicationRecord
  has_many :unit_products, dependent: :delete_all
  accepts_nested_attributes_for :unit_products, allow_destroy: true

  has_attached_file :image, use_timestamp: false, styles: { high: '1200x900#', medium: '600x450#', thumb: '64x64#' }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  def as_json(options)
    Hash.new.tap do |h|
      %i[id name description category in_stock featured].each { |key| h[key] = send(key) }
      h[:image_paths] = image.styles.keys.map { |style| [style, image.url(style)] }.to_h
      if unit_products.count == 1
        h[:price] = unit_products[0].price
      else
        h[:unit_products] = unit_products.map { |up| Hash.new.tap { |hh| %i[id property price].each { |key| hh[key] = up.send(key) } } }
      end
    end
  end
end
