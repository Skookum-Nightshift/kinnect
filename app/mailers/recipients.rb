class Recipients < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.recipients.stream_link.subject
  #
  def stream_link(eamil, sender, link)
    @greeting = "Hi"

    mail to: eamil
  end
end
