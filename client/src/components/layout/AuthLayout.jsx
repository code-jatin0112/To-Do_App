import { CheckCircle2, SquareKanban } from "lucide-react";

export default function AuthLayout({ children }) {
    return (
        <div className="min-h-screen bg-slate-100 flex">
            
           <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-700 via-indigo-600 to-purple-700 text-white p-20 flex-col justify-center">

                <div className="flex items-center gap-4">

                    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                        <SquareKanban size={42} />
                    </div>

                    <h1 className="text-6xl font-extrabold tracking-tight">
                        TaskFlow
                    </h1>

                </div>

                <p className="mt-6 text-xl text-indigo-100 leading-relaxed max-w-md">
                    Organize your work.
                    <br />
                    Focus on what matters.
                </p>

                <div className="mt-14 space-y-5">

                    <div className="flex items-center gap-3">
                        <CheckCircle2 size={22} />
                        <span className="text-lg">
                            Manage daily tasks effortlessly
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <CheckCircle2 size={22} />
                        <span className="text-lg">
                            Track deadlines and priorities
                        </span>
                    </div>

                    <div className="flex items-center gap-3">
                        <CheckCircle2 size={22} />
                        <span className="text-lg">
                            Stay productive every day
                        </span>
                    </div>

                </div>

                <div className="mt-16 max-w-sm rounded-3xl bg-white/10 p-6 backdrop-blur-md border border-white/20">

                    <p className="text-indigo-100 text-sm">
                        Today's Progress
                    </p>

                    <h2 className="mt-3 text-4xl font-bold">
                        85%
                    </h2>

                    <div className="mt-6 h-3 w-full rounded-full bg-white/20">
                        <div className="h-3 w-[85%] rounded-full bg-white"></div>
                    </div>

                    <div className="mt-8 flex justify-between">

                        <div>
                            <p className="text-2xl font-bold">28</p>
                            <p className="text-sm text-indigo-100">
                                Completed
                            </p>
                        </div>

                        <div>
                            <p className="text-2xl font-bold">5</p>
                            <p className="text-sm text-indigo-100">
                                Pending
                            </p>
                        </div>

                    </div>

                </div>

            </div>
            
            <div className="flex-1 flex items-center justify-center p-8">

                {children}

            </div>
        
        </div>
    );
}