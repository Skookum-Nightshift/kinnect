class RecipientMailer < ApplicationMailer
  def stream_link(email, sender)
    @sender_name = sender.name
    @link = stream_url(id: sender.id, name: @sender_name.parameterize)

    mail to: email, subject: "New Kinnect update form #{@sender_name}"
  end
end
