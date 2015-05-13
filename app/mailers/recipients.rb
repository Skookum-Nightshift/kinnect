class Recipients < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.recipients.stream_link.subject
  #
  def stream_link(email, sender)
    @link = stream_url(id: sender.id, name: sender_name.parameterize)
    @sender_name = sender.name

    mail to: email, subject: "New Kinnct update form #{@sender_name}"
  end
end
