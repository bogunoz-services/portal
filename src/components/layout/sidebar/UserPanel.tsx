import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {SidebarMenu, SidebarMenuButton, SidebarMenuItem} from "@/components/ui/sidebar";
import type { User } from "@/models/user/user";
import {observer} from "mobx-react-lite";
import {Ellipsis, MessageSquareDot, SquareArrowRightEnter, SquareArrowRightExit, UserCircle} from "lucide-react";
import { en } from "@/text/en";
import {useState} from "react";
import LoginDialog from "@/components/layout/sidebar/LoginDialog.tsx";

interface UserPanelProps {
    user: User;
    userLogIn: boolean;
}

const UserPanel = observer((props: UserPanelProps) => {
    const { user, userLogIn } = props;
    const [loginOpen, setLoginOpen] = useState(false);


    return (
        <>
            <SidebarMenu>
                <SidebarMenuItem>
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton
                                size="lg"
                                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            >
                                <Avatar className="h-8 w-8 rounded-lg grayscale">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">{user.name}</span>
                                    <span className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </span>
                                </div>
                                <Ellipsis className="ml-auto size-4" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                            align="end"
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar className="h-8 w-8 rounded-lg">
                                        <AvatarImage src={user.avatar} alt={user.name} />
                                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{user.name}</span>
                                        <span className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </span>
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                {userLogIn ??
                                    <DropdownMenuItem>
                                        <UserCircle/>
                                        {en.sidebarUserPanel.account}
                                    </DropdownMenuItem>
                                }
                                <DropdownMenuItem>
                                    <MessageSquareDot />
                                    {en.sidebarUserPanel.notifications}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            {userLogIn ?
                                <DropdownMenuItem>
                                    <SquareArrowRightExit />
                                    {en.sidebarUserPanel.logOut}
                                </DropdownMenuItem> :
                                <DropdownMenuItem onSelect={() => setLoginOpen(true)}>
                                    <SquareArrowRightEnter />
                                    {en.sidebarUserPanel.logIn}
                                </DropdownMenuItem>
                            }
                        </DropdownMenuContent>
                    </DropdownMenu>
                </SidebarMenuItem>
            </SidebarMenu>
            <LoginDialog open={loginOpen} onOpenChange={setLoginOpen} />
        </>
    );
});

export default UserPanel;