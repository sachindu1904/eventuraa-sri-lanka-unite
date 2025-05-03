
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { MessageSquare, Video, Phone, User, Clock, Shield, Send, Paperclip, Calendar, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from '@/components/ui/badge';

interface PatientCommunicationProps {
  doctor: {
    name: string;
    photo: string;
  };
}

const PatientCommunication = ({ doctor }: PatientCommunicationProps) => {
  const { toast } = useToast();
  const [currentTab, setCurrentTab] = useState('inbox');
  const [messageText, setMessageText] = useState('');
  
  // Mock patients data
  const patients = [
    {
      id: 1,
      name: "Sarah Johnson",
      photo: null,
      unread: true,
      lastMessage: "Thanks doctor, I'll schedule the follow-up appointment next week.",
      lastMessageTime: "Today, 11:23 AM",
      isUrgent: false
    },
    {
      id: 2,
      name: "Rajiv Kumar",
      photo: null,
      unread: true,
      lastMessage: "The pain in my chest has increased since yesterday. Is this concerning?",
      lastMessageTime: "Today, 09:45 AM",
      isUrgent: true
    },
    {
      id: 3,
      name: "Emma Wilson",
      photo: null,
      unread: false,
      lastMessage: "I've sent you the lab results as requested.",
      lastMessageTime: "Yesterday",
      isUrgent: false
    },
  ];
  
  const [selectedPatient, setSelectedPatient] = useState(patients[0]);
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    toast({
      title: "Message sent",
      description: "Your message has been sent to the patient",
    });
    setMessageText('');
  };
  
  const handleStartVideoCall = () => {
    toast({
      title: "Starting video call",
      description: `Initiating video call with ${selectedPatient.name}`,
    });
  };
  
  const handlePatientSelect = (patient: any) => {
    setSelectedPatient(patient);
  };
  
  // Sample messages for the selected patient
  const patientMessages = [
    { sender: 'patient', content: 'Hello Dr. Perera, I\'ve been having some chest pain lately.', time: '11:20 AM' },
    { sender: 'doctor', content: 'Hello Sarah, I\'m sorry to hear that. Can you describe the pain in more detail? When does it occur and how severe is it?', time: '11:22 AM' },
    { sender: 'patient', content: 'It\'s a sharp pain on the left side of my chest, usually when I exert myself. It started about a week ago.', time: '11:25 AM' },
    { sender: 'doctor', content: 'Thank you for the description. Have you had any shortness of breath, dizziness, or sweating along with the pain?', time: '11:27 AM' },
    { sender: 'patient', content: 'Yes, I do feel a bit breathless when the pain comes.', time: '11:28 AM' },
    { sender: 'doctor', content: 'I think we should schedule you for an in-person examination as soon as possible. This could be something we need to check right away.', time: '11:30 AM' },
    { sender: 'patient', content: 'Thanks doctor, I\'ll schedule the follow-up appointment next week.', time: '11:32 AM' },
  ];
  
  // Quick replies
  const quickReplies = [
    "Please describe your symptoms in detail.",
    "I recommend booking a video consultation for better assessment.",
    "Please upload your recent lab reports.",
    "How are you feeling after starting the medication?"
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Patient Communication</h1>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule
          </Button>
          <Button size="sm" variant="secondary">
            <Shield className="h-4 w-4 mr-2" />
            Privacy Settings
          </Button>
        </div>
      </div>
      
      <div className="h-[600px] bg-white border rounded-lg overflow-hidden">
        <Tabs 
          defaultValue="inbox" 
          value={currentTab} 
          onValueChange={setCurrentTab} 
          className="h-full flex flex-col"
        >
          <div className="border-b px-4">
            <TabsList className="h-14">
              <TabsTrigger value="inbox" className="data-[state=active]:bg-blue-50">
                <MessageSquare className="h-4 w-4 mr-2" />
                Inbox
              </TabsTrigger>
              <TabsTrigger value="scheduled" className="data-[state=active]:bg-blue-50">
                <Calendar className="h-4 w-4 mr-2" />
                Scheduled
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <TabsContent value="inbox" className="h-full m-0">
              <div className="flex h-full">
                {/* Patient List */}
                <div className="w-1/3 border-r overflow-auto">
                  <div className="p-3 border-b">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input placeholder="Search patients..." className="pl-8" />
                    </div>
                  </div>
                  
                  <div className="divide-y">
                    {patients.map((patient) => (
                      <div 
                        key={patient.id}
                        className={`p-3 hover:bg-gray-50 cursor-pointer ${selectedPatient.id === patient.id ? 'bg-blue-50' : ''}`}
                        onClick={() => handlePatientSelect(patient)}
                      >
                        <div className="flex items-start space-x-2">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={patient.photo || undefined} alt={patient.name} />
                            <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-center mb-1">
                              <p className={`text-sm font-medium truncate ${patient.unread ? 'text-black' : 'text-gray-700'}`}>
                                {patient.name}
                              </p>
                              <span className="text-xs text-gray-500">{patient.lastMessageTime}</span>
                            </div>
                            
                            <div className="flex items-center">
                              {patient.isUrgent && (
                                <Badge variant="destructive" className="mr-1 h-1.5 w-1.5 rounded-full p-0"></Badge>
                              )}
                              <p className={`text-xs truncate ${patient.unread ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                                {patient.lastMessage}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Chat Area */}
                <div className="flex-1 flex flex-col h-full">
                  {/* Chat Header */}
                  <div className="p-3 border-b flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={selectedPatient.photo || undefined} alt={selectedPatient.name} />
                        <AvatarFallback>{selectedPatient.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{selectedPatient.name}</p>
                        <p className="text-xs text-gray-500">Patient ID: #10045</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="ghost" onClick={handleStartVideoCall}>
                        <Video className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <User className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="text-center">
                      <Badge variant="outline" className="text-xs bg-gray-100">
                        Today
                      </Badge>
                    </div>
                    
                    {patientMessages.map((message, index) => (
                      <div 
                        key={index} 
                        className={`flex ${message.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === 'doctor' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p 
                            className={`text-xs mt-1 text-right ${
                              message.sender === 'doctor' ? 'text-blue-100' : 'text-gray-500'
                            }`}
                          >
                            {message.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Quick Replies */}
                  <div className="p-2 border-t bg-gray-50">
                    <p className="text-xs text-gray-500 mb-2 px-2">Quick Replies:</p>
                    <div className="flex flex-wrap gap-2 px-2">
                      {quickReplies.map((reply, index) => (
                        <Button 
                          key={index} 
                          variant="outline" 
                          size="sm" 
                          className="text-xs py-1 h-auto"
                          onClick={() => setMessageText(reply)}
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-3 border-t flex items-end">
                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <Paperclip className="h-5 w-5 text-gray-500" />
                    </Button>
                    
                    <div className="flex-1 mx-2">
                      <Textarea 
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="min-h-[60px] max-h-[120px] resize-none"
                      />
                      <div className="text-xs text-gray-500 mt-1 flex items-center">
                        <Shield className="h-3 w-3 mr-1" />
                        <span>End-to-end encrypted</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="flex-shrink-0" 
                      size="sm"
                      onClick={handleSendMessage}
                      disabled={!messageText.trim()}
                    >
                      <Send className="h-4 w-4 mr-1" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="scheduled" className="h-full m-0 p-4">
              <div className="text-center h-full flex flex-col items-center justify-center space-y-3 text-gray-500">
                <Calendar className="h-12 w-12" />
                <h3 className="text-lg font-medium">Upcoming Appointments</h3>
                <p className="text-sm">View and manage your scheduled consultations here.</p>
                <Button className="mt-2">View Schedule</Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientCommunication;
