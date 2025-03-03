"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/store/store"
import { updateThemeSettings } from "@/features/ui/uiSlice"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { primaryColorOptions, type ThemeSettings, type ThemeMode, borderRadiusValues } from "@/lib/theme-config"

export default function SettingsPage() {
  const dispatch = useDispatch()
  const { toast } = useToast()
  const { setTheme } = useTheme()
  const themeSettings = useSelector((state: RootState) => state.ui.themeSettings)

  const [formState, setFormState] = useState({
    name: "John Doe",
    email: "john@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    apiKey: "sk_test_12345abcdef",
    emailNotifications: true,
    pushNotifications: false,
  })

  const handleThemeModeChange = (mode: ThemeMode) => {
    dispatch(updateThemeSettings({ mode }))
    setTheme(mode)
  }

  const handlePrimaryColorChange = (primaryColor: string) => {
    dispatch(updateThemeSettings({ primaryColor }))
  }

  const handleBorderRadiusChange = (borderRadius: ThemeSettings["borderRadius"]) => {
    dispatch(updateThemeSettings({ borderRadius }))
  }

  const handleAnimationChange = (animation: ThemeSettings["animation"]) => {
    dispatch(updateThemeSettings({ animation }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully",
    })
  }

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault()

    if (formState.newPassword !== formState.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully",
    })
  }

  const handleResetTheme = () => {
    dispatch(
      updateThemeSettings({
        mode: "system",
        primaryColor: "blue",
        borderRadius: "medium",
        animation: "medium",
      }),
    )
    setTheme("system")

    toast({
      title: "Theme Reset",
      description: "Theme settings have been reset to defaults",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your account profile information and email</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" value={formState.name} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={formState.email} onChange={handleInputChange} />
                  </div>
                </div>
                <Button type="submit">Save Changes</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSavePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={formState.currentPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      value={formState.newPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formState.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <Button type="submit">Update Password</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Theme Settings</CardTitle>
              <CardDescription>Customize the appearance of the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Theme Mode</h3>
                  <RadioGroup
                    defaultValue={themeSettings.mode}
                    onValueChange={(value) => handleThemeModeChange(value as ThemeMode)}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="light" id="light" />
                      <Label htmlFor="light">Light</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dark" id="dark" />
                      <Label htmlFor="dark">Dark</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="system" id="system" />
                      <Label htmlFor="system">System</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Primary Color</h3>
                  <div className="grid grid-cols-6 gap-2">
                    {primaryColorOptions.map((color) => (
                      <Button
                        key={color.value}
                        type="button"
                        variant="outline"
                        className={`w-full h-10 rounded-md p-0 ${
                          themeSettings.primaryColor === color.value ? "ring-2 ring-primary" : ""
                        }`}
                        style={{ backgroundColor: color.color }}
                        onClick={() => handlePrimaryColorChange(color.value)}
                      >
                        <span className="sr-only">{color.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Border Radius</h3>
                  <RadioGroup
                    defaultValue={themeSettings.borderRadius}
                    onValueChange={(value) => handleBorderRadiusChange(value as ThemeSettings["borderRadius"])}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="small" id="radius-small" />
                      <Label htmlFor="radius-small">Small</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="radius-medium" />
                      <Label htmlFor="radius-medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large" id="radius-large" />
                      <Label htmlFor="radius-large">Large</Label>
                    </div>
                  </RadioGroup>

                  <div className="flex mt-2 space-x-2">
                    <div className="w-16 h-8 bg-primary" style={{ borderRadius: borderRadiusValues.small }}></div>
                    <div className="w-16 h-8 bg-primary" style={{ borderRadius: borderRadiusValues.medium }}></div>
                    <div className="w-16 h-8 bg-primary" style={{ borderRadius: borderRadiusValues.large }}></div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-2">Animation Speed</h3>
                  <RadioGroup
                    defaultValue={themeSettings.animation}
                    onValueChange={(value) => handleAnimationChange(value as ThemeSettings["animation"])}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="fast" id="animation-fast" />
                      <Label htmlFor="animation-fast">Fast</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="animation-medium" />
                      <Label htmlFor="animation-medium">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="slow" id="animation-slow" />
                      <Label htmlFor="animation-slow">Slow</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="none" id="animation-none" />
                      <Label htmlFor="animation-none">None</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <Button variant="outline" onClick={handleResetTheme}>
                  Reset to Defaults
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                  </div>
                  <Switch
                    id="emailNotifications"
                    name="emailNotifications"
                    checked={formState.emailNotifications}
                    onCheckedChange={(checked) => setFormState((prev) => ({ ...prev, emailNotifications: checked }))}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-muted-foreground">Receive notifications in the browser</p>
                  </div>
                  <Switch
                    id="pushNotifications"
                    name="pushNotifications"
                    checked={formState.pushNotifications}
                    onCheckedChange={(checked) => setFormState((prev) => ({ ...prev, pushNotifications: checked }))}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="font-medium">Notification Types</h3>
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-leads">Lead Updates</Label>
                      <Switch id="notify-leads" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-tasks">Task Reminders</Label>
                      <Switch id="notify-tasks" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-customers">Customer Activity</Label>
                      <Switch id="notify-customers" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="notify-team">Team Messages</Label>
                      <Switch id="notify-team" defaultChecked />
                    </div>
                  </div>
                </div>

                <Button className="mt-4">Save Notification Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* API Settings */}
        <TabsContent value="api" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API keys for third-party integrations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="apiKey"
                      name="apiKey"
                      value={formState.apiKey}
                      onChange={handleInputChange}
                      type="password"
                      className="flex-1"
                    />
                    <Button
                      variant="outline"
                      onClick={() => {
                        toast({
                          title: "API Key Copied",
                          description: "API key has been copied to clipboard",
                        })
                      }}
                    >
                      Copy
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This key provides full access to your account. Keep it secure.
                  </p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Regenerate API Key</h3>
                  <p className="text-sm text-muted-foreground">
                    Regenerating your API key will invalidate your existing key. All applications using the old key will
                    need to be updated.
                  </p>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      toast({
                        title: "API Key Regenerated",
                        description: "A new API key has been generated",
                      })
                    }}
                  >
                    Regenerate Key
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <h3 className="font-medium">Connected Applications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Slack Integration</p>
                        <p className="text-sm text-muted-foreground">Connected on Jan 12, 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Google Calendar</p>
                        <p className="text-sm text-muted-foreground">Connected on Mar 5, 2023</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Disconnect
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

