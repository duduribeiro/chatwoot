# frozen_string_literal: true

FactoryBot.define do
  factory :message do
    content { 'Message' }
    status { 'sent' }
    message_type { 'incoming' }
    content_type { 'text' }
    fb_id { SecureRandom.uuid }
    account { create(:account) }

    after(:build) do |message|
      message.user ||= create(:user, account: message.account)
      message.conversation ||= create(:conversation, account: message.account)
      message.inbox ||= create(:inbox, account: message.account)
    end
  end
end
