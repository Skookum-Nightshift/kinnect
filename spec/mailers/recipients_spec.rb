require "rails_helper"

RSpec.describe Recipients, type: :mailer do
  describe "stream_link" do
    let(:mail) { Recipients.stream_link }

    it "renders the headers" do
      expect(mail.subject).to eq("Stream link")
      expect(mail.to).to eq(["to@example.org"])
      expect(mail.from).to eq(["from@example.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to match("Hi")
    end
  end

end
