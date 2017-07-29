Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :admin do
    resources :products
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
    end
  end
end
