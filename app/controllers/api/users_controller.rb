class Api::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def sign_in
    new_user = false
    user = User.where(uuid: user_params[:id]).first_or_create do |created_user|
      created_user.name = user_params[:name]
      created_user.email = user_params[:email]
      created_user.fb_token = user_params[:token]
      created_user.password = Devise.friendly_token[0,20]
      new_user = true
    end

    json = JSON.parse(user.as_json(
      only: [:uuid, :id, :name, :email, :fb_token, "newUser"]
    ).to_json)
    json["newUser"] = new_user

    respond_to do |format|
      format.html { render file: "#{Rails.root}/public/404", layout: false, status: :not_found }
      format.json { render json: json }
    end
  end

  def add_recipients
    message = 'Recipients added successfully'
    user = User.where(uuid: user_params[:id]).first
    params[:recipients].each do |recipient_email|
      recipient = Recipient.initialize(user_id: user.id, email: recipient_email)
      if !recipient.save
        message = 'Failed to create recipients'
        break
      end
    end

    recipients = user.recipients.as_json(only: [:email, :id])
    json = { recipients: recipients, message: message }
    respond_to do |format|
      format.html { render file: "#{Rails.root}/public/404", layout: false, status: :not_found }
      format.json { render json: json }
    end
  end

  private

    def user_params
      params.require(:user).permit([:id, :name, :token, :email])
    end

end