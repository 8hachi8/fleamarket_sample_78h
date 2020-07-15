Rails.application.routes.draw do
  root 'homes#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  resources :items, only: [:index, :new, :show, :create] do
    collection do
      get 'get_category_children', defaults: { format: 'json' }
      get 'get_category_grandchildren', defaults: { format: 'json' }
    end
  end
  devise_for :users
  resources :profiles, only: [:index, :new, :create, :show, :edit, :update]
  resources :users, only: [:show]
  resources :categories, only: [:index, :show]
  resources :credit_cards
  resources :purchase, only: :show
end
