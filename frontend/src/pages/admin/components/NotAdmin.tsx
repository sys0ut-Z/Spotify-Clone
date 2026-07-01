import React from 'react';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const NotAdmin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <Card className="w-full max-w-md shadow-2xl bg-zinc-900 border-zinc-800 border-t-4 border-t-green-500">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto bg-green-500/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <ShieldAlert className="w-8 h-8 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-zinc-100">
            Access Denied
          </CardTitle>
          <CardDescription className="text-zinc-400 mt-2">
            You do not have the required administrator privileges to view this page.
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="bg-green-500/10 p-4 rounded-md border border-green-500/20 text-sm text-green-400 text-center">
            If you believe this is a mistake, please contact your system administrator to request access.
          </div>
        </CardContent>
        
        <CardFooter className="flex items-center mt-4">
          <Button
            variant="outline"
            className="w-full bg-transparent border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300 hover:border-green-500/50 cursor-pointer"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          {/* <Button
            className="w-full bg-green-600 hover:bg-green-500 text-white cursor-pointer"
            onClick={() => window.location.href = '/'}
          >
            <Home className="w-4 h-4 mr-2" />
            Return Home
          </Button> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default NotAdmin;