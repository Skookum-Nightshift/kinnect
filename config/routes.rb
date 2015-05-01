Rails.application.routes.draw do

  namespace :api do
    scope :v1 do
      post '/users/sign_in', to: 'users#sign_in'
    end
  end


  devise_for :users
  get 'pages/index'

  get '*any', to: 'pages#not_found'
  root 'pages#index'
end
