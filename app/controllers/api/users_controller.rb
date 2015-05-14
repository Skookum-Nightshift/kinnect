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
    message = "Recipients added successfully"
    state = "ok"
    user = User.where(uuid: user_params[:id]).first
    sucessful = []
    params[:emails].each do |recipient_email|
      recipient = Recipient.new(user_id: user.id, email: recipient_email)
      if !recipient.save
        message = "Failed to create recipients"
        state = "error"
        sucessful.each do |delete_me|
          delete_me.destroy!
        end
        break
      end
      sucessful.push(recipient)
    end

    recipients = user.recipients.as_json(only: [:email, :id])
    json = { recipients: recipients, message: message, state: state }
    respond_to do |format|
      format.html { render file: "#{Rails.root}/public/404", layout: false, status: :not_found }
      format.json { render json: json }
    end
  end

  def get_photos
    json = { message: "Search failed", status: "error" }
    user = User.where(uuid: user_params[:id]).first
    if user
      @graph = Koala::Facebook::API.new(user.fb_token)
      albums = @graph.get_connections("me", "albums")
      photos = []
      albums.each do |album|
        photos.push(@graph.get_object("#{album['id']}/photos"))
      end
      json = photos.flatten.sort_by { |photo| DateTime.parse(photo["created_time"]) }
      json = json.reverse!.first(10)
    end

    respond_to do |format|
      format.html { render file: "#{Rails.root}/public/404", layout: false, status: :not_found }
      format.json { render json: json }
    end
  end

  def save_photos
    user = User.where(uuid: user_params[:id]).first
    json = { message: "Save failed", status: "error" }

    if user
      params[:photos].each do |photo|
        user.photos.create(url: photo)
      end
      user.recipients.each do |recipient|
        RecipientMailer.stream_link(recipient.email, user).deliver_now
      end
      json = { message: "Save successfully", status: "OK" }
    end

    respond_to do |format|
      format.html { render file: "#{Rails.root}/public/404", layout: false, status: :not_found }
      format.json { render json: json }
    end
  end

  private

    def user_params
      params.require(:user).permit([:id, :name, :token, :email, :uuid])
    end

end
