# Preview all emails at http://localhost:3000/rails/mailers/recipients
class RecipientsPreview < ActionMailer::Preview

  # Preview this email at http://localhost:3000/rails/mailers/recipients/stream_link
  def stream_link
    Recipients.stream_link
  end

end
