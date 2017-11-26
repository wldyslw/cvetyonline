Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)

  namespace :admin do
    resources :products
    resources :unit_products
  end

  scope '/api' do
    scope '/v1' do
      resources :products, only: [:index] do
        collection do
          get 'id/:id', action: :show
          get 'name/:name', action: :show
          get 'category/:category', action: :search
          get 'featured', action: :search, defaults: { featured: true }
        end
      end
      resources :orders, only: [:create]
    end
  end
end
