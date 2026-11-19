"use client"

import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenuButton
} from "@/components/ui/sidebar"
import { observer } from "mobx-react-lite"
import type { Device } from "@/models/device/device.ts"
import DeviceSwitcher from "@/components/layout/sidebar/DeviceSwitcher.tsx"
import type {ComponentProps} from "react";
import {ChartLine, Settings, SquareActivity, Table} from "lucide-react";
import {en} from "@/text/en.ts";
import UserPanel from "@/components/layout/sidebar/UserPanel.tsx";
import type {User} from "@/models/user/user.ts";

interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
    setSelectedDevice: (device: Device) => void
    getDevices: () => Promise<Device[]>
    deleteDevice: (hash: string) => Promise<void>
    handleNavigateToDevice: (variant: "inspect" | "edit" | "add", deviceName?: string, hash?: string) => void
    handleNavigateToDashboard: () => void;
    handleNavigateToDataTable: () => void;
    handleNavigateToFittingsSettings: () => void;
    handleNavigateToFittingsDashboard: () => void;
    getDeviceConnectionStatus: () => boolean | null;
}



const AppSidebar = observer((props: AppSidebarProps) => {
    const { getDevices, deleteDevice, handleNavigateToDevice, getDeviceConnectionStatus,
        handleNavigateToDashboard, handleNavigateToDataTable, handleNavigateToFittingsSettings,
        handleNavigateToFittingsDashboard, setSelectedDevice, ...sidebarProps } = props

    return (
        <Sidebar collapsible="offcanvas" {...sidebarProps}>
            <SidebarHeader>
                <DeviceSwitcher
                    setSelectedDevice={setSelectedDevice}
                    getDevices={getDevices}
                    deleteDevice={deleteDevice}
                    getDeviceConnectionStatus={getDeviceConnectionStatus}
                    handleNavigateToDevice={handleNavigateToDevice}
                />
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>{en.sidebarGroups.daqs}</SidebarGroupLabel>
                    <SidebarGroupContent className="pl-2 flex flex-col gap-2 font-light">
                        <SidebarMenuButton onClick={handleNavigateToDashboard}>
                            <ChartLine/>
                            <span>{en.sidebarTabs.dashboardPage}</span>
                        </SidebarMenuButton>
                        <SidebarMenuButton onClick={handleNavigateToDataTable} >
                            <Table/>
                            <span>{en.sidebarTabs.experimentData}</span>
                        </SidebarMenuButton>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>{en.sidebarGroups.fittings}</SidebarGroupLabel>
                    <SidebarGroupContent className="pl-2 flex flex-col gap-2 font-light">
                        <SidebarMenuButton onClick={handleNavigateToFittingsSettings}>
                            <Settings/>
                            <span>{en.sidebarTabs.fittingsSettings}</span>
                        </SidebarMenuButton>
                        <SidebarMenuButton onClick={handleNavigateToFittingsDashboard}>
                            <SquareActivity/>
                            <span>{en.sidebarTabs.fittings}</span>
                        </SidebarMenuButton>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <UserPanel
                    user={
                        {
                            name: "shadcn",
                            email: "m@example.com",
                            avatar: "/avatars/shadcn.jpg",
                        } as User
                    }
                   userLogIn={false}
                />
            </SidebarFooter>
        </Sidebar>
    )
})

export default AppSidebar