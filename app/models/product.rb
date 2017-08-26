class Product < ApplicationRecord
  has_attached_file :image, use_timestamp: false, styles: { high: '1200x900#', medium: '600x450#', thumb: '64x64#' }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  def as_json(options)
    Hash.new.tap do |h|
      %i[id name description category price in_stock featured].each { |key| h[key] = send(key) }
      h[:image_paths] = image.styles.keys.map { |style| [style, image.url(style)] }.to_h
    end
  end
end
