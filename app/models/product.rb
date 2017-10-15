class Product < ApplicationRecord
  has_many :unit_products, dependent: :delete_all
  has_many :product_images, dependent: :delete_all
  accepts_nested_attributes_for :unit_products, allow_destroy: true
  accepts_nested_attributes_for :product_images, allow_destroy: true

  def as_json(_options)
    {}.tap do |h|
      %i[id name description category in_stock featured].each { |key| h[key] = send(key) }
      h[:images] = product_images.map { |image_record| image_record.image.styles.keys.map { |style| [style, image_record.image.url(style)] }.to_h }
      if unit_products.count == 1
        h[:price] = unit_products[0].price
      else
        h[:unit_products] = unit_products.map { |up| Hash.new.tap { |hh| %i[id property price].each { |key| hh[key] = up.send(key) } } }
      end
    end
  end
end
