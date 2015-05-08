Rails.application.routes.draw do

  namespace :api do
    scope :v1 do
      post '/users/sign_in', to: 'users#sign_in'
      get '/users/get_photos', to: 'users#get_photos'
      get '/users/save_photos', to: 'users#save_photos'
    end
  end


  devise_for :users
  get 'pages/index'

  get '*any', to: 'pages#not_found'
  root 'pages#index'
end
