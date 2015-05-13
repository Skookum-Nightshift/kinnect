Rails.application.routes.draw do

  namespace :api do
    scope :v1 do
      scope :users do
        post '/sign_in', to: 'users#sign_in'
        get '/get_photos', to: 'users#get_photos'
        post '/save_photos', to: 'users#save_photos'
        post '/add_recipients', to: 'users#add_recipients'
      end
    end
  end


  devise_for :users
  get 'pages/index'

  get '/stream/:name/:id', to: 'pages#stream', as: 'stream'

  get '*any', to: 'pages#not_found'
  root 'pages#index'
end
