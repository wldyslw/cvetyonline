ActiveAdmin.register Order do
  actions :index, :destroy
  # belongs_to :unit_order

  # See permitted parameters documentation:
  # https://github.com/activeadmin/activeadmin/blob/master/docs/2-resource-customization.md#setting-up-strong-parameters
  #
  # permit_params :telephone, :pickup, :comment, :address

  index do
    script 'setTimeout(location.reload.bind(location), 60000);', type: 'text/javascript'
    selectable_column
    id_column
    %i[client_name telephone pickup address comment].each { |field| column field }
    column 'Products' do |order|
      span "#{order.unit_products.count} products in order"
      table do
        tr do
          th 'Quantity'
          th 'Product', colspan: 2
        end
        order.unit_orders.each do |unit_order|
          tr do
            td unit_order.quantity, rowspan: 5
            th 'Name'
            td(
              link_to(unit_order.unit_product.product.name, admin_product_path(unit_order.unit_product.product), title: unit_order.unit_product.product.description) +
              ' ' +
              link_to("(#{unit_order.unit_product.property.empty? ? 'Default' : unit_order.unit_product.property})", admin_unit_product_path(unit_order.unit_product))
            )
          end
          tr do
            th 'Category'
            td unit_order.unit_product.product.category
          end
          tr do
            th 'Price'
            td unit_order.unit_product.price
          end
          tr do
            th 'In stock'
            td status_tag(*(unit_order.unit_product.product.in_stock ? ['Yes', :ok] : ['No']))
          end
          tr do
            th 'Featured'
            td status_tag(*(unit_order.unit_product.product.featured ? ['Yes', :ok] : ['No']))
          end
        end
      end
      span "#{order.unit_orders.map { |unit_order| unit_order.quantity * unit_order.unit_product.price }.sum} total"
    end
    actions
  end
end
